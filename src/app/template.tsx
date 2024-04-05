import React from 'react'
import Layout from '../components/Layout/index'

export default function rootTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return <Layout>{children}</Layout>
}
