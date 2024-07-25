import React from 'react'
import { Button } from '../../Button/Button'

export const Terminal: React.FC = () => {
    return (
        <section className="terminal-section grid lg:grid-cols-2 gap-[10px]">
            <div className="widget">
                <h2 className="font-semibold mb-[10px] text-[20px]">Терминал</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio consequuntur quos provident ipsam architecto ratione asperiores laborum doloremque, culpa nobis, quibusdam accusamus illo eveniet, fugit maxime hic repellat necessitatibus alias.</p>
            </div>
            <div className="widget flex flex-col min-w-[300px] justify-center">
                <h2 className="font-semibold mb-[10px] text-[20px]">Введите данные</h2>
                <form method="post" className='flex flex-col gap-[10px]'>
                    <input
                        type="text"
                        className="form-input"
                        placeholder='Введите сумму'
                        required />
                    <Button type="submit" className="btn-primary">Создать</Button>
                </form>
            </div>
        </section>
    )
}