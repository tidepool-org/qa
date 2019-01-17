# Aggregate Statistics QA Tool

This tool is intended to validate aggregate statistics displayed on Tidepool staging accounts.  
Included is a Jupyter Python Notebook and associated Python script

## Setup

#### 1. Configure Local Environment Variables

Open the `.env.example` file and fill in the information for:  

`email` Tidepool staging account email  
`pass` Tidepool staging account password  
`id` A 10 character string as seen in the profile URL  

You can setup more than one id with different names (eg. id2, test_account, etc)  

Save the file as `.env`  

#### 2. Install Dependencies

Verify your installation at the terminal with the command `python --version`  
If your version is less than Python 3, download the latest version at https://www.python.org/downloads/

Next install the following packages using the command `pip install PACKAGE_NAME`
```
jupyter
pandas
python-dotenv
tzlocal
```

#### 3. Start Jupyter Notebook

You can start the Jupyter server using the command `jupyter notebook`

A new browser tab will open with the Jupyter environment once loaded

Navigate within Jupyter to the location of `agg-stats-qa.ipynb` and open it

#### 4. Run the notebook

Each cell in a notebook can be run individually using `SHIFT+ENTER`

You can also use the dropdown menu to run all cells at once `Cell > Run All`

Output tables containing all aggregate statistics will be displayed at the end of the notebook