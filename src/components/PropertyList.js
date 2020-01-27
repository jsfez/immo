import React from 'react'
import { Table, Tr, Th, Td } from './Table'

export function PropertyList({ data }) {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Opportunité</Th>
          <Th>surface</Th>
        </Tr>
      </thead>
      <tbody>
        {data.properties.map(({ name, surface }, index) => (
          <Tr key={index}>
            <Td>{name}</Td>
            <Td>{surface}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  )
}
