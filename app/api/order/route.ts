import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  const body = await req.json()

  const {
    full_name,
    phone,
    address,
    quantity,
  } = body

  const total = quantity * 120000

  let customerId = ''

  const { data: existingCustomer } =
    await supabase
      .from('customers')
      .select('*')
      .eq('phone', phone)
      .single()

  if (existingCustomer) {
    customerId = existingCustomer.id

    await supabase
      .from('customers')
      .update({
        order_count:
          existingCustomer.order_count + 1,

        total_spent:
          Number(existingCustomer.total_spent) +
          total,
      })
      .eq('id', customerId)
  } else {
    const { data: newCustomer } =
      await supabase
        .from('customers')
        .insert({
          full_name,
          phone,
          address,
          order_count: 1,
          total_spent: total,
        })
        .select()
        .single()

    customerId = newCustomer.id
  }

  await supabase.from('orders').insert({
    customer_id: customerId,
    quantity,
    order_total: total,
  })

  return NextResponse.json({
    success: true,
  })
}