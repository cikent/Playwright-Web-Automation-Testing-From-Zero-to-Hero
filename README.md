# Playwright-Web-Automation-Testing-From-Zero-to-Hero

* Repo for Course: Playwright: Web Automation Testing From Zero to Hero
* Creator: Artem Bondar
* Source: [Github bondar-artem / pw-practice-app](https://github.com/bondar-artem/pw-practice-app)

## Test App Setup via 'pw-practice-app' folder

1. Select the Source hyperlink to navigate to the GitHub repo containing the project by Artem Bondar!

2. Once on the pw-practice-app GitHub root page, select the "<> Code" drop down menu and copy the HTTPS url to your clipboard

3. Via the Terminal, navigate to the desired directory where you would like to host the pw-practice-app as a Submodule

4. Via the Terminal, input the following command:
    
    ````markdown
    ```shell
    git submodule add <repository_url> <path/to/submodule>

    ```
    ````

    ````markdown
    ```shell
    git submodule add https://github.com/bondar-artem/pw-practice-app.git "C:\Development\Playwright-Projects\Playwright-Web-Automation-Testing-From-Zero-to-Hero"
    ```
    ````

5. Via the Terminal, navigate into the directory created for the pw-practice-app:

    ```shell
    cd pw-practice-app
    ```

6. Install all the relevant pw-practice-app packages. Via the Terminal, input:

    ```shell
    npm install --force
    ```

    Wait for all the dependencies to finish installation... and ensure you don't have any Errors, then proceed.

7. Locally host the pw-practice-app to interact with it in the browser. Via the Terminal, input:

    ```shell
    npm start
    ```

    Wait for confirmation message ***Compiled successfully.***

8. Open a browser tab and input the following url:

    ```shell
    http://localhost:4200/
    ```

