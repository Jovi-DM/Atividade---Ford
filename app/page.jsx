import './styles/cards.css'

async function getData() {
  try {
    const response = await fetch('http://localhost:3000/api/workers/')
    if (!response.ok) throw new Error('Failed to fetch data')
    return await response.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    return null
  }
}

export default async function Dashboard() {
    const dados = await getData()
    
    if (!dados) return <div className="container">No data is avaliable</div>

    return (
        // Aprenseta os dados do header
        <div className="container">
            <div className="header-sector">
                <h1>Data Analysis</h1>
            </div>
        {/* Primeiro card apresentado     */}
            <div className="card">
                <h2>Total existing roles</h2>
                <p>{dados.data.count_roles.data.total_cargos[0] || 0}</p>
            </div>
        {/* Apresenta todos os cargos existentes, os 5 maiores e 5 menores salários*/}
            <div className="card">
                <h2>All roles</h2>
                <table className="data-table">
                    <tbody>
                        {dados.data.all_roles.data.cargos.map((cargo, index) => (
                            <tr key={index}>
                                <td>{cargo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='cards-grid'>
                <div className="card">
                    <h2>Top 5 Lower Salaries</h2>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Salaries</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.data.lower_salaries.data.salario.map((salario, index) => (
                                <tr key={index}>
                                    <td>{new Intl.NumberFormat('pt-BR', { 
                                        style: 'currency', 
                                        currency: 'BRL' 
                                    }).format(salario)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="card">
                    <h2>Top 5 Bigger Salaries</h2>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Salaries</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.data.bigger_salaries.data.salario.map((salario, index) => (
                                <tr key={index}>
                                    <td>{new Intl.NumberFormat('pt-BR', { 
                                        style: 'currency', 
                                        currency: 'BRL' 
                                    }).format(salario)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Apresenta a média de salário e os melhores salários por cargo */}
            <div className="card">
                <h2>The average salaries by roles</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Roles</th>
                            <th>Salaries</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.data.avg_salary.data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.cargo}</td>
                                <td>{new Intl.NumberFormat('pt-BR', { 
                                    style: 'currency', 
                                    currency: 'BRL' 
                                }).format(item.avgSalary)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="card">
                <h2>The better salaries by roles</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cargo</th>
                            <th>Salário</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.data.better_employesalary.data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.nome}</td>
                                <td>{item.cargo}</td>
                                <td>{new Intl.NumberFormat('pt-BR', { 
                                    style: 'currency', 
                                    currency: 'BRL' 
                                }).format(item.salario)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}