# Ford Scholarship Project

## Description  
This project was developed as part of my application for the Ford Company scholarship program. It involves analyzing data from `company.db` (included in this repository) and providing SQL-based solutions to the given questions.

## Project Setup

### Prerequisites
- Node.js (v14 or higher recommended)
- Yarn (alternative: npm)

### First you need run

```bash
$ yarn
```

### If you don't have yarn

```bash
$ npm install --global yarn
```

### Start project

```bash
$ yarn dev
```

## How to Use This Project
- The *company.db* database contains the dataset shared in file project.
- Below are screenshots demonstrating the project's outputs:

Questions and Answers
1. How many unique job roles do we have? And which are they?
```sql

-- Count how many roles exist
SELECT 
  COUNT(DISTINCT cargo) AS total_roles 
FROM workers
WHERE cargo IS NOT NULL;
```
<img src="https://github.com/user-attachments/assets/a07f793d-8757-461e-871d-54d38e3a7050" width="400">

```sql

-- Get all roles
SELECT 
  DISTINCT cargo AS roles 
FROM workers
WHERE cargo IS NOT NULL
ORDER BY cargo ASC;
```
![all_roles](https://github.com/user-attachments/assets/65302795-a736-4d37-8319-b569031d75ba)

2. Top 5 highest salaries
```sql

SELECT salario
FROM workers
ORDER BY salario DESC
LIMIT 5
```
![top5bigger](https://github.com/user-attachments/assets/0caf626b-65d3-4052-b874-2c224b77175b)


3. Top 5 lowest salaries
```sql

SELECT 
  nome AS employee_name,
  salario AS salary
FROM workers
WHERE salario > 0  -- Exclude zero/null salaries if needed
ORDER BY salario ASC
LIMIT 5;
```
![top5lower](https://github.com/user-attachments/assets/ba052659-b24d-43c2-a681-2ed7171e623f)


4. Average salary per job role
```sql

SELECT AVG(salario) as avgSalary, cargo
FROM workers
GROUP BY cargo
```
![avgsalaryrole](https://github.com/user-attachments/assets/616cdb33-43bc-4e6d-a16f-5adb31bfaede)

5. Employees with highest salaries per job role
```sql

SELECT nome, salario, cargo
FROM workers w
WHERE salario = (
  SELECT MAX(salario)
  FROM workers
  WHERE cargo = w.cargo
)
ORDER BY 3 ASC
```
![bettersalaryrole](https://github.com/user-attachments/assets/485309b8-7ef2-4193-b183-80a82a5cac85)
