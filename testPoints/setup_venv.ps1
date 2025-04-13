# Step 1: Create a virtual environment named 'myenv'
python -m venv myenv

# Step 2: Activate the virtual environment
# PowerShell requires the use of a different activation script for Windows
$env:VIRTUAL_ENV = ".\myenv"
$env:PATH = ".\myenv\Scripts" + ";" + $env:PATH

# Step 3: Install matplotlib
pip install matplotlib

# Step 4: Print confirmation message
Write-Host "matplotlib has been installed successfully."

# Step 5: Deactivate the virtual environment (optional)
#deactivate
