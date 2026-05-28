'use client'

import { useState } from 'react'

export default function Home() {
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    address: '',
    quantity: 1,
  })

  const submitOrder = async () => {
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      alert('Đặt hàng thành công')

      setForm({
        full_name: '',
        phone: '',
        address: '',
        quantity: 1,
      })
    }
  }

  return (
    <div
      style={{
        padding: 40,
        maxWidth: 500,
        margin: 'auto',
        fontFamily: 'Arial',
      }}
    >
      <h1>🍓 ĐẶT DÂU TÂY ĐÀ LẠT</h1>

      <input
        placeholder='Họ tên'
        value={form.full_name}
        onChange={(e) =>
          setForm({
            ...form,
            full_name: e.target.value,
          })
        }
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 10,
        }}
      />

      <input
        placeholder='Số điện thoại'
        value={form.phone}
        onChange={(e) =>
          setForm({
            ...form,
            phone: e.target.value,
          })
        }
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 10,
        }}
      />

      <input
        placeholder='Địa chỉ'
        value={form.address}
        onChange={(e) =>
          setForm({
            ...form,
            address: e.target.value,
          })
        }
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 10,
        }}
      />

      <input
        type='number'
        value={form.quantity}
        onChange={(e) =>
          setForm({
            ...form,
            quantity: Number(e.target.value),
          })
        }
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 10,
        }}
      />

      <button
        onClick={submitOrder}
        style={{
          width: '100%',
          padding: 15,
          background: 'red',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Đặt hàng
      </button>
    </div>
  )
}