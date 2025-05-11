export const dashboardQueries = {
  count_roles: `
    SELECT 
      COUNT(DISTINCT cargo) as total_cargos 
    FROM workers
    WHERE cargo IS NOT NULL
  `,
  
  all_roles: `
    SELECT 
      DISTINCT cargo as cargos 
    FROM workers
    WHERE cargo IS NOT NULL
    ORDER BY cargo ASC
  `,

  bigger_salaries: `
    SELECT salario
    FROM workers
    ORDER BY salario DESC
    LIMIT 5
    `,
    
  lower_salaries: `
    SELECT salario
    FROM workers
    ORDER BY salario ASC
    LIMIT 5
  `,

  avg_salary: `
    SELECT AVG(salario) as avgSalary, cargo
    FROM workers
    GROUP BY cargo
  `,

  better_employesalary: `
    SELECT nome, salario, cargo
    FROM workers w
    WHERE salario = (
      SELECT MAX(salario)
      FROM workers
      WHERE cargo = w.cargo
    )
    ORDER BY 3 ASC
  `
};