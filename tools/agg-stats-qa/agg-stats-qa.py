
# coding: utf-8

# In[6]:


import requests
import json
import pandas as pd
import os
from os.path import dirname, isfile
from dotenv import load_dotenv
import tzlocal
import datetime
import warnings
from datetime import timedelta
from IPython.display import display, Markdown

# Set warnings as errors to receive traceback
warnings.simplefilter('error', RuntimeWarning)

# https://trello.com/c/suWzyusJ/441-standardize-aggregated-agg-stats-widgets-data-viz-general


# In[7]:


# %% load environmental variables

if isfile('.env'):
    load_dotenv('.env')
else:
    print("No .env file found!")


# In[48]:


def get_user_data(email, password, userid):

    url1 = "https://stg-api.tidepool.org/auth/login"
    myResponse = requests.post(url1, auth=(email, password))
    usersData = 0

    if(myResponse.ok):
        xtoken = myResponse.headers["x-tidepool-session-token"]
        url2 = "https://stg-api.tidepool.org/data/" + userid
        headers = {
            "x-tidepool-session-token": xtoken,
            "Content-Type": "application/json"
            }

        myResponse2 = requests.get(url2, headers=headers)
        if(myResponse2.ok):

            usersData = json.loads(myResponse2.content.decode())
            usersData = pd.DataFrame(usersData)

        else:
            print("ERROR", myResponse2.status_code)
    else:
        print("ERROR", myResponse.status_code)

    return usersData


# Optional remove duplicates
def remove_cgm_duplicates(df):
    return df.drop_duplicates(subset="time")


def get_cgm_trends(cgm_df, start_date, end_date, range_name, bg_format):

    df = cgm_df.copy()

    # Set up BG conversions
    if(bg_format == "mg_dL"):
        df.value = round(df.value * 18.01559)
        very_low = 54
        low = 70
        high = 180
        very_high = 250

    else:
        very_low = 3.0
        low = 3.9
        high = 10.0
        very_high = 13.9

    # Setup Column Names
    column_names = ["Date Range",
                    "First Timestamp",
                    "Last Timestamp",
                    "% > "+str(very_high),
                    "% "+str(high)+"-"+str(very_high),
                    "% "+str(low)+"-"+str(high),
                    "% "+str(very_low)+"-"+str(low),
                    "% < "+str(very_low),
                    "Time > "+str(very_high),
                    "Time "+str(high)+"-"+str(very_high),
                    "Time "+str(low)+"-"+str(high),
                    "Time "+str(very_low)+"-"+str(low),
                    "Time < "+str(very_low),
                    "Avg Glucose (CGM)",
                    "Sensor Usage",
                    "GMI (CGM)",
                    "Std. Deviation (CGM)",
                    "CV (CGM)"
                    ]

    df = df[(df["localTime"] >= start_date) & (df["localTime"] <= end_date)]
    trends_df = pd.DataFrame(index=[range_name], columns=column_names)

    if(len(df) < 1):
        trends_df.fillna("No CGM Data", inplace=True)
    else:

        trends_df["Date Range"] = df["localTime"].min().strftime('%b %d, %Y') + " - " + df["localTime"].max().strftime('%b %d, %Y')
        trends_df["First Timestamp"] = df["localTime"].min()
        trends_df["Last Timestamp"] = df["localTime"].max()

        cgm_points = df.value.count()
        trends_df["% > "+str(very_high)] = 100*sum(df.value > very_high)/cgm_points
        trends_df["% "+str(high)+"-"+str(very_high)] = 100*sum((df.value > high) & (df.value <= very_high))/cgm_points
        trends_df["% "+str(low)+"-"+str(high)] = 100*sum((df.value >= low) & (df.value <= high))/cgm_points
        trends_df["% "+str(very_low)+"-"+str(low)] = 100*sum((df.value >= very_low) & (df.value < low))/cgm_points
        trends_df["% < "+str(very_low)] = 100*sum(df.value < very_low)/cgm_points

        trends_df["Time > "+str(very_high)] = "%dh %dm" % divmod(round(1440*trends_df["% > "+str(very_high)]/100), 60)
        trends_df["Time "+str(high)+"-"+str(very_high)] = "%dh %dm" % divmod(round(1440*trends_df["% "+str(high)+"-"+str(very_high)])/100, 60)
        trends_df["Time "+str(low)+"-"+str(high)] = "%dh %dm" % divmod(round(1440*trends_df["% "+str(low)+"-"+str(high)]/100), 60)
        trends_df["Time "+str(very_low)+"-"+str(low)] = "%dh %dm" % divmod(round(1440*trends_df["% "+str(very_low)+"-"+str(low)]/100), 60)
        trends_df["Time < "+str(very_low)] = "%dh %dm" % divmod(round(1440*trends_df["% < "+str(very_low)]/100), 60)

        trends_df["Avg Glucose (CGM)"] = df.value.mean()

        total_possible_points = len(pd.date_range(start_date, end_date, freq="5min"))
        trends_df["Sensor Usage"] = 100*cgm_points/total_possible_points

        if((cgm_points >= int(288*14*0.7)) & (range_name != "1 week")):
            trends_df["GMI (CGM)"] = 3.31 + 0.02392 * trends_df["Avg Glucose (CGM)"]
        else:
            trends_df["GMI (CGM)"] = "Not Enough Data"
        trends_df["Std. Deviation (CGM)"] = df.value.std()
        trends_df["CV (CGM)"] = 100*trends_df["Std. Deviation (CGM)"]/trends_df["Avg Glucose (CGM)"]

    return trends_df


def get_bgm_trends(bgm_df, start_date, end_date, range_name, bg_format):

    df = bgm_df.copy()

    # Setup BG conversions
    if(bg_format == "mg_dL"):
        df.value = round(df.value * 18.01559)
        very_low = 54
        low = 70
        high = 180
        very_high = 250

    else:
        very_low = 3.0
        low = 3.9
        high = 10.0
        very_high = 13.9

    # Setup day counts
    day_counts = pd.DataFrame({"1 week": [7], "2 weeks": [14], "4 weeks": [28]})
    days = int(day_counts[range_name])

    # Setup Column Names
    column_names = ["Date Range",
                    "First Timestamp",
                    "Last Timestamp",
                    "Avg Count > "+str(very_high),
                    "Avg Count "+str(high)+"-"+str(very_high),
                    "Avg Count "+str(low)+"-"+str(high),
                    "Avg Count "+str(very_low)+"-"+str(low),
                    "Avg Count < "+str(very_low),
                    "% > "+str(very_high),
                    "% "+str(high)+"-"+str(very_high),
                    "% "+str(low)+"-"+str(high),
                    "% "+str(very_low)+"-"+str(low),
                    "% < "+str(very_low),
                    "Avg Glucose (BGM)",
                    "Std. Deviation (BGM)",
                    "CV (BGM)"
                    ]

    df = df[(df["localTime"] >= start_date) & (df["localTime"] <= end_date)]
    trends_df = pd.DataFrame(index=[range_name], columns=column_names)

    if(len(df) < 1):
        trends_df.fillna("No BGM Data", inplace=True)
    else:

        trends_df["Date Range"] = df["localTime"].min().strftime('%b %d, %Y') + " - " + df["localTime"].max().strftime('%b %d, %Y')
        trends_df["First Timestamp"] = df["localTime"].min()
        trends_df["Last Timestamp"] = df["localTime"].max()

        cgm_points = df.value.count()
        trends_df["% > "+str(very_high)] = 100*sum(df.value > very_high)/cgm_points
        trends_df["% "+str(high)+"-"+str(very_high)] = 100*sum((df.value > high) & (df.value <= very_high))/cgm_points
        trends_df["% "+str(low)+"-"+str(high)] = 100*sum((df.value >= low) & (df.value <= high))/cgm_points
        trends_df["% "+str(very_low)+"-"+str(low)] = 100*sum((df.value >= very_low) & (df.value < low))/cgm_points
        trends_df["% < "+str(very_low)] = 100*sum(df.value < very_low)/cgm_points

        trends_df["Avg Count > "+str(very_high)] = sum(df.value > very_high)/days
        trends_df["Avg Count "+str(high)+"-"+str(very_high)] = sum((df.value > high) & (df.value <= very_high))/days
        trends_df["Avg Count "+str(low)+"-"+str(high)] = sum((df.value >= low) & (df.value <= high))/days
        trends_df["Avg Count "+str(very_low)+"-"+str(low)] = sum((df.value >= very_low) & (df.value < low))/days
        trends_df["Avg Count < "+str(very_low)] = sum(df.value < very_low)/days

        trends_df["Avg Glucose (BGM)"] = df.value.mean()
        trends_df["Std. Deviation (BGM)"] = df.value.std()
        trends_df["CV (BGM)"] = 100*trends_df["Std. Deviation (BGM)"]/trends_df["Avg Glucose (BGM)"]

    return trends_df


def get_cgm_basic(cgm_df, bolus_df, basal_df, wizard_df, end_date, bg_format):

    # Set start date to the last Monday (0) at most 21 days away
    day_of_week = (pd.to_datetime(end_date)-timedelta(days=21)).weekday()

    if(day_of_week > 0):
        subtract_days = 7 - (day_of_week % 7)
    else:
        subtract_days = 0

    start_date = (pd.to_datetime(end_date)-timedelta(days=21-subtract_days)).strftime("%Y-%m-%d")

    days = (pd.to_datetime(end_date)-pd.to_datetime(start_date)).days

    df = cgm_df.copy()
    temp_bolus_df = bolus_df.copy()
    temp_basal_df = basal_df.copy()
    temp_wizard_df = wizard_df.copy()

    # Set up BG conversions
    if(bg_format == "mg_dL"):
        df.value = round(df.value * 18.01559)
        very_low = 54
        low = 70
        high = 180
        very_high = 250

    else:
        very_low = 3.0
        low = 3.9
        high = 10.0
        very_high = 13.9

    # Setup Column Names
    column_names = ["Date Range",
                    "First Timestamp",
                    "Last Timestamp",
                    "% > "+str(very_high),
                    "% "+str(high)+"-"+str(very_high),
                    "% "+str(low)+"-"+str(high),
                    "% "+str(very_low)+"-"+str(low),
                    "% < "+str(very_low),
                    "Time > "+str(very_high),
                    "Time "+str(high)+"-"+str(very_high),
                    "Time "+str(low)+"-"+str(high),
                    "Time "+str(very_low)+"-"+str(low),
                    "Time < "+str(very_low),
                    "Avg Glucose (CGM)",
                    "Sensor Usage",
                    "% Avg Basal",
                    "% Avg Bolus",
                    "Avg Daily Basal",
                    "Avg Daily Bolus",
                    "Avg Daily Carbs",
                    "Avg Daily Total Insulin",
                    "GMI (CGM)",
                    ]

    df = df[(df["localTime"] >= start_date) & (df["localTime"] <= end_date)]
    temp_bolus_df = temp_bolus_df[(temp_bolus_df["localTime"] >= start_date) & (temp_bolus_df["localTime"] <= end_date)]
    temp_basal_df = temp_basal_df[(temp_basal_df["localTime"] >= start_date) & (temp_basal_df["localTime"] <= end_date)]
    temp_wizard_df = temp_wizard_df[(temp_wizard_df["localTime"] >= start_date) & (temp_wizard_df["localTime"] <= end_date)]
    trends_df = pd.DataFrame(index=["Basic CGM"], columns=column_names)

    if(len(df) < 1):
        trends_df.fillna("No CGM Data", inplace=True)
    else:

        trends_df["Date Range"] = df["localTime"].min().strftime('%b %d, %Y') + " - " + df["localTime"].max().strftime('%b %d, %Y')
        trends_df["First Timestamp"] = df["localTime"].min()
        trends_df["Last Timestamp"] = df["localTime"].max()

        cgm_points = df.value.count()
        trends_df["% > "+str(very_high)] = 100*sum(df.value > very_high)/cgm_points
        trends_df["% "+str(high)+"-"+str(very_high)] = 100*sum((df.value > high) & (df.value <= very_high))/cgm_points
        trends_df["% "+str(low)+"-"+str(high)] = 100*sum((df.value >= low) & (df.value <= high))/cgm_points
        trends_df["% "+str(very_low)+"-"+str(low)] = 100*sum((df.value >= very_low) & (df.value < low))/cgm_points
        trends_df["% < "+str(very_low)] = 100*sum(df.value < very_low)/cgm_points

        trends_df["Time > "+str(very_high)] = "%dh %dm" % divmod(round(1440*trends_df["% > "+str(very_high)]/100), 60)
        trends_df["Time "+str(high)+"-"+str(very_high)] = "%dh %dm" % divmod(round(1440*trends_df["% "+str(high)+"-"+str(very_high)])/100, 60)
        trends_df["Time "+str(low)+"-"+str(high)] = "%dh %dm" % divmod(round(1440*trends_df["% "+str(low)+"-"+str(high)]/100), 60)
        trends_df["Time "+str(very_low)+"-"+str(low)] = "%dh %dm" % divmod(round(1440*trends_df["% "+str(very_low)+"-"+str(low)]/100), 60)
        trends_df["Time < "+str(very_low)] = "%dh %dm" % divmod(round(1440*trends_df["% < "+str(very_low)]/100), 60)

        trends_df["Avg Glucose (CGM)"] = df.value.mean()

        total_possible_points = len(pd.date_range(start_date, end_date, freq="5min"))
        trends_df["Sensor Usage"] = 100*cgm_points/total_possible_points

        if(len(temp_basal_df) > 0):
            trends_df["Avg Daily Basal"] = (temp_basal_df.rate * temp_basal_df.duration/1000/60/60).sum()/days
        else:
            trends_df["Avg Daily Basal"] = 0
  
        if(len(temp_bolus_df) > 0):
            trends_df["Avg Daily Bolus"] = temp_bolus_df["normal"].sum()/days
        else:
            trends_df["Avg Daily Bolus"] = 0

        if(len(temp_wizard_df) > 0):
            trends_df["Avg Daily Carbs"] = temp_wizard_df["carbInput"].sum()/days
        else:
            trends_df["Avg Daily Carbs"] = 0

        trends_df["Avg Daily Total Insulin"] = trends_df["Avg Daily Bolus"] + trends_df["Avg Daily Basal"]

        if((trends_df["Avg Daily Total Insulin"] > 0)[0]):
            trends_df["% Avg Bolus"] = 100 * trends_df["Avg Daily Bolus"] / trends_df["Avg Daily Total Insulin"]
            trends_df["% Avg Basal"] = 100 * trends_df["Avg Daily Basal"] / trends_df["Avg Daily Total Insulin"]
        else:
            trends_df["% Avg Bolus"] = 0
            trends_df["% Avg Basal"] = 0

        if((cgm_points >= int(288*14*0.7))):
            trends_df["GMI (CGM)"] = 3.31 + 0.02392 * trends_df["Avg Glucose (CGM)"]
        else:
            trends_df["GMI (CGM)"] = "Not Enough Data"

    return trends_df


def get_bgm_basic(bgm_df, bolus_df, basal_df, wizard_df, end_date, bg_format):

    # Set start date to the last Monday (0) at most 21 days away
    day_of_week = (pd.to_datetime(end_date)-timedelta(days=21)).weekday()

    if(day_of_week > 0):
        subtract_days = 7 - (day_of_week % 7)
    else:
        subtract_days = 0

    start_date = (pd.to_datetime(end_date)-timedelta(days=21-subtract_days)).strftime("%Y-%m-%d")

    days = (pd.to_datetime(end_date)-pd.to_datetime(start_date)).days

    df = bgm_df.copy()
    temp_bolus_df = bolus_df.copy()
    temp_basal_df = basal_df.copy()
    temp_wizard_df = wizard_df.copy()

    # Set up BG conversions
    if(bg_format == "mg_dL"):
        df.value = round(df.value * 18.01559)
        very_low = 54
        low = 70
        high = 180
        very_high = 250

    else:
        very_low = 3.0
        low = 3.9
        high = 10.0
        very_high = 13.9

    # Setup Column Names
    column_names = ["Date Range",
                    "First Timestamp",
                    "Last Timestamp",
                    "Avg Count > "+str(very_high),
                    "Avg Count "+str(high)+"-"+str(very_high),
                    "Avg Count "+str(low)+"-"+str(high),
                    "Avg Count "+str(very_low)+"-"+str(low),
                    "Avg Count < "+str(very_low),
                    "% > "+str(very_high),
                    "% "+str(high)+"-"+str(very_high),
                    "% "+str(low)+"-"+str(high),
                    "% "+str(very_low)+"-"+str(low),
                    "% < "+str(very_low),
                    "Avg Glucose (BGM)",
                    "% Avg Basal",
                    "% Avg Bolus",
                    "Avg Daily Basal",
                    "Avg Daily Bolus",
                    "Avg Daily Carbs",
                    "Avg Daily Total Insulin",
                    ]

    df = df[(df["localTime"] >= start_date) & (df["localTime"] <= end_date)]
    temp_bolus_df = temp_bolus_df[(temp_bolus_df["localTime"] >= start_date) & (temp_bolus_df["localTime"] <= end_date)]
    temp_basal_df = temp_basal_df[(temp_basal_df["localTime"] >= start_date) & (temp_basal_df["localTime"] <= end_date)]
    temp_wizard_df = temp_wizard_df[(temp_wizard_df["localTime"] >= start_date) & (temp_wizard_df["localTime"] <= end_date)]
    trends_df = pd.DataFrame(index=["Basic BGM"], columns=column_names)

    if(len(df) < 1):
        trends_df.fillna("No BGM Data", inplace=True)
    else:

        trends_df["Date Range"] = df["localTime"].min().strftime('%b %d, %Y') + " - " + df["localTime"].max().strftime('%b %d, %Y')
        trends_df["First Timestamp"] = df["localTime"].min()
        trends_df["Last Timestamp"] = df["localTime"].max()

        cgm_points = df.value.count()
        trends_df["% > "+str(very_high)] = 100*sum(df.value > very_high)/cgm_points
        trends_df["% "+str(high)+"-"+str(very_high)] = 100*sum((df.value > high) & (df.value <= very_high))/cgm_points
        trends_df["% "+str(low)+"-"+str(high)] = 100*sum((df.value >= low) & (df.value <= high))/cgm_points
        trends_df["% "+str(very_low)+"-"+str(low)] = 100*sum((df.value >= very_low) & (df.value < low))/cgm_points
        trends_df["% < "+str(very_low)] = 100*sum(df.value < very_low)/cgm_points

        trends_df["Avg Count > "+str(very_high)] = sum(df.value > very_high)/days
        trends_df["Avg Count "+str(high)+"-"+str(very_high)] = sum((df.value > high) & (df.value <= very_high))/days
        trends_df["Avg Count "+str(low)+"-"+str(high)] = sum((df.value >= low) & (df.value <= high))/days
        trends_df["Avg Count "+str(very_low)+"-"+str(low)] = sum((df.value >= very_low) & (df.value < low))/days
        trends_df["Avg Count < "+str(very_low)] = sum(df.value < very_low)/days

        trends_df["Avg Glucose (BGM)"] = df.value.mean()

        if(len(temp_basal_df) > 0):
            trends_df["Avg Daily Basal"] = (temp_basal_df.rate * temp_basal_df.duration/1000/60/60).sum()/days
        else:
            trends_df["Avg Daily Basal"] = 0

        if(len(temp_bolus_df) > 0):
            trends_df["Avg Daily Bolus"] = temp_bolus_df["normal"].sum()/days
        else:
            trends_df["Avg Daily Bolus"] = 0

        if(len(temp_wizard_df) > 0):
            trends_df["Avg Daily Carbs"] = temp_wizard_df["carbInput"].sum()/days
        else:
            trends_df["Avg Daily Carbs"] = 0

        trends_df["Avg Daily Total Insulin"] = trends_df["Avg Daily Bolus"] + trends_df["Avg Daily Basal"]

        if((trends_df["Avg Daily Total Insulin"] > 0)[0]):
            trends_df["% Avg Bolus"] = 100 * trends_df["Avg Daily Bolus"] / trends_df["Avg Daily Total Insulin"]
            trends_df["% Avg Basal"] = 100 * trends_df["Avg Daily Basal"] / trends_df["Avg Daily Total Insulin"]
        else:
            trends_df["% Avg Bolus"] = 0
            trends_df["% Avg Basal"] = 0

    return trends_df

# def get_weekly_stats(bgm_df, custom_start_date, custom_end_date)


# # Pre-Processing

# In[49]:


# Retrieve all data
data_df = get_user_data(os.environ["email"], os.environ["pass"], os.environ["id"])

if("time" not in list(data_df)):
    print("No Data Downloaded!")

# Convert time column to datetime format
data_df.time = pd.to_datetime(data_df.time).dt.tz_localize('UTC')

# If there is a manual upload, get the timezone of the most recent upload
# Otherwise default to local computer time
if("timezone" in list(data_df)):
    local_timezone = data_df.loc[data_df["type"] == "upload"].sort_values(by="time", ascending=False).reset_index()["timezone"][0]
else:
    local_timezone = str(tzlocal.get_localzone())

# Convert UTC time to new timezone
data_df["localTime"] = data_df.time.dt.tz_convert(local_timezone)

# Filter the data into cgm, bolus, and basal dataframes
cgm_df = data_df.loc[data_df.type == "cbg", ].copy()
bgm_df = data_df.loc[data_df.type == "smbg", ].copy()
bolus_df = data_df.loc[data_df.type == "bolus", ].copy()
basal_df = data_df.loc[data_df.type == "basal", ].copy()
wizard_df = data_df.loc[data_df.type == "wizard", ].copy()


# # Output Settings

# In[50]:


bg_format = "mg_dL"
# bg_format = "mmol_l"


# # Process Aggregated Statistics

# In[51]:


# Trends View Statistics
# Set default Trends start and end dates
if(len(cgm_df > 0)):
    end_date = cgm_df["localTime"].max()
else:
    end_date = bgm_df["localTime"].max()

# Uncomment for custom end dates
# end_date = pd.to_datetime("2018-12-11").tz_localize(local_timezone)

start_date_1week = (end_date-timedelta(days=6)).strftime("%Y-%m-%d")
start_date_2weeks = (end_date-timedelta(days=13)).strftime("%Y-%m-%d")
start_date_4weeks = (end_date-timedelta(days=27)).strftime("%Y-%m-%d")
end_date = (end_date+timedelta(days=1)).strftime("%Y-%m-%d")

cgm_trends = pd.DataFrame()
cgm_trends = cgm_trends.append(get_cgm_trends(cgm_df, start_date_1week, end_date, "1 week", bg_format))
cgm_trends = cgm_trends.append(get_cgm_trends(cgm_df, start_date_2weeks, end_date, "2 weeks", bg_format))
cgm_trends = cgm_trends.append(get_cgm_trends(cgm_df, start_date_4weeks, end_date, "4 weeks", bg_format))

bgm_trends = pd.DataFrame()
bgm_trends = bgm_trends.append(get_bgm_trends(bgm_df, start_date_1week, end_date, "1 week", bg_format))
bgm_trends = bgm_trends.append(get_bgm_trends(bgm_df, start_date_2weeks, end_date, "2 weeks", bg_format))
bgm_trends = bgm_trends.append(get_bgm_trends(bgm_df, start_date_4weeks, end_date, "4 weeks", bg_format))

cgm_basic = get_cgm_basic(cgm_df, bolus_df, basal_df, wizard_df, end_date, bg_format)
bgm_basic = get_bgm_basic(bgm_df, bolus_df, basal_df, wizard_df, end_date, bg_format)

# weekly_view = get_weekly_stats(bgm_df)


# # OUTPUT

# In[64]:


display(Markdown("## Trends View (CGM)"))
display(cgm_trends.T)
display(Markdown("## Trends View (BGM)"))
display(bgm_trends.T)
display(Markdown("## Basics View (CGM)"))
display(cgm_basic.T)
display(Markdown("## Basics View (BGM)"))
display(bgm_basic.T)

