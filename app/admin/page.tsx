'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const [customers, setCustomers] =
    useState<any[]>([])

  const loadCustomers = async () => {
    const { data } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', {
        ascending: false,
      })

    setCustomers(data || [])
  }

  useEffect(() => {
    loadCustomers()
  }, [])

  return (
    <div
      style={{
        padding: 40,
        fontFamily: 'Arial',
      }}
    >
      <h1>ADMIN KHÁCH HÀNG</h1>

      <table
        border={1}
        cellPadding={10}
        style={{
          width: '100%',
          marginTop: 20,
        }}
      >
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>SĐT</th>
            <th>Địa chỉ</th>
            <th>Số đơn</th>
            <th>Tổng tiền</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.full_name}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td>{customer.order_count}</td>
              <td>
                {Number(
                  customer.total_spent
                ).toLocaleString()}
                đ
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}