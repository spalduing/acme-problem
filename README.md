# acme-problem

ACME flexibility problem

### Exercise

The company ACME offers their employees the flexibility to work the hours they want. But due to some external circumstances they need to know what employees have been at the office within the same time frame

The goal of this exercise is to output a table containing pairs of employees and how often they have coincided in the office.

Input: the name of an employee and the schedule they worked, indicating the time and hours. This should be a .txt file with at least five sets of data. You can include the data from our examples below:

#### Example 1:

**INPUT:**
RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00

**OUTPUT:**
ASTRID-RENE: 2
ASTRID-ANDRES: 3
RENE-ANDRES: 2

#### Example 2:

**INPUT:**
RENE=MO10:15-12:00,TU10:00-12:00,TH13:00-13:15,SA14:00-18:00,SU20:00-21:00
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00

**OUTPUT:**
RENE-ASTRID: 3

## Solution explanation

My first aproach to this problem was start writing pseudo-code of the major task needed to know the coincidences
of the workers at the office.

The first step was to read the input file and transform the data into an array of lines of the imput file.

The second step was to get the number coincidences of the schedules of a pair of workers

In order to do that, I've implemented some methods to split the schedule of each worker into an array and map.

    - The Map contains key-value pairs of the day and time the worker A has been in the office.
    - The Array contains a list of string of the days and time that the worker B has been in the office.
    - While we're going over the array we validate if the two workers have concieded in a day and time and
        if so, we incremment a counter conincidences, that in the end will give us the number of coincidences
        in the office of workers A and B.

## How to run this program

You must have installed a recent version of nodejs in your local machine and preferebly use the VScode IDE.

- **vscode-extention**
  If you are in vscode you can install the 'Code Runner' extention by Jun Han. Then select the code inside of the index.js file
  located in the root path of this repository press right click and select the 'Run code' menu option (ctrl+Alt+N).

- **npm-script**
  You can run the 'npm run start' command in your terminal

## How to run test with jest

- **npm-script**
  You can run the 'npm test' command to execute the tests for this program
