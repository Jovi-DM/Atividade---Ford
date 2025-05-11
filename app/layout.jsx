import './styles/global.css'
import Image from 'next/image'

export default function RootLayout({ children }) {
    return (
        <html>
            <body>
                <div className='header'>
                    <div className='header-content'>
                        <Image
                            src="/images/symbols/ford.png"
                            alt="Ford Emblem"
                            width={600}  
                            height={240}
                            className="logo"
                        />
                    </div>
                </div>
                <div className="container">
                    {children}
                </div>
            </body>
        </html>
    )
}