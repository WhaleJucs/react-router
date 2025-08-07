import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { useState } from 'react'

import './Home.css'

const Home = () => {
    // 3 - carregamento de dados
    const url = "http://localhost:3000/products"
    const {data: items, httpConfig, loading, error} = useFetch(url)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [product, setProduct] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const product = {
        name,
        price
        }

        httpConfig(product, 'POST')
        setName('')
        setPrice('')
    }

    const handleRemove = (id) => {
        httpConfig(id, 'DELETE')
    }

    return (
    <div className='Home'>
        <h1>Produtos</h1>
        {loading && <p>Carregando dados...</p>}
        {error && <p>{error}</p>}
        {!loading && (
            <ul className="products">
                {items && items.map((item) => (
                    <li key={item.id}>
                        <h2>{item.name}</h2>
                        <p>R$: {item.price}</p>
                        <button onClick={() => handleRemove(product.id)}>Excluir</button>

                        {/* 4 - rota dinâmica */}
                        <Link to={`/products/${item.id}`}>Detalhes</Link>
                    </li>
                ))}
            </ul>
        )}

        <div className="add-product">
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text"
                            value={name}
                            name='name'
                            onChange={(e) => setName(e.target.value)} />
                </label>
                <label onSubmit={handleSubmit}>
                    Preço:
                    <input type="number"
                            value={price}
                            name='price'
                            onChange={(e) => setPrice(e.target.value)} />
                </label>

                {loading && <input type="submit" disabled value='Aguarde' />}
                {!loading && <input type="submit" value='Criar' />}
            </form>
        </div>
    </div>
  )
}

export default Home