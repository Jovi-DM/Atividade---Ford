# Ford Scholarship Data Analysis Project

## 📌 Project Overview
This project was developed in Nextjs as part of my application for the Ford Company scholarship program. It involves analyzing data from `company.db` (included in this repository) and providing SQL-based solutions to the given questions.

_OBS.: No data preprocessing or cleaning was performed._

## 🛠️ Technical Setup

### Prerequisites
- Node.js (v14 or higher)
- Yarn package manager
- SQLite3 (for database interaction)

### Installation
```bash
# Install dependencies
yarn
# or using npm
npm install

# Install Yarn globally (if needed)
npm install -g yarn

```

### Start project

```bash
$ npx prisma generate

# in next

$ yarn dev
```

## How to Use This Project
- The company.db file contains the dataset provided in the PDF document sent by email;
- Below are screenshots demonstrating the project's outputs.

## Questions and Answers
1. How many unique job roles do we have? And which are they?
```sql

-- Count how many roles exist
SELECT 
  COUNT(DISTINCT cargo) AS total_roles 
FROM workers
WHERE cargo IS NOT NULL;
```

<div align="center">
  <img src="https://github.com/user-attachments/assets/a07f793d-8757-461e-871d-54d38e3a7050" width="400">
</div>

```sql

-- Get all roles
SELECT 
  DISTINCT cargo AS roles 
FROM workers
WHERE cargo IS NOT NULL
ORDER BY cargo ASC;
```
<div align="center">
  <img src=https://github.com/user-attachments/assets/65302795-a736-4d37-8319-b569031d75ba  width="400">
</div>

2. Top 5 highest salaries
```sql
-- Get top 5 highest salaries
SELECT salario
FROM workers
ORDER BY salario DESC
LIMIT 5
```
<div align="center">
   <img src=https://github.com/user-attachments/assets/0caf626b-65d3-4052-b874-2c224b77175b width="400">
</div>

3. Top 5 lowest salaries
```sql
-- Get top 5 lowest salaries
SELECT salario
FROM workers
ORDER BY salario ASC
LIMIT 5
```
<div align="center">
   <img src=https://github.com/user-attachments/assets/ba052659-b24d-43c2-a681-2ed7171e623f  width="400">
</div>

4. Average salary per job role
```sql
-- Get average salary per job role
SELECT AVG(salario) as avgSalary, cargo
FROM workers
GROUP BY cargo
```
<div align="center">
   <img src=https://github.com/user-attachments/assets/616cdb33-43bc-4e6d-a16f-5adb31bfaede width="600">
</div>

5. Employees with highest salaries per job role
```sql

-- Get the employees that have the better salaries per job role
SELECT nome, salario, cargo
FROM workers w
WHERE salario = (
  SELECT MAX(salario)
  FROM workers
  WHERE cargo = w.cargo
)
ORDER BY 3 ASC
```
<div align="center">
   <img src=https://github.com/user-attachments/assets/485309b8-7ef2-4193-b183-80a82a5cac85 width="600">
</div>
