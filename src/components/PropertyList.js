import React from 'react'
import { Table, Tr, Th, Td } from './Table'
import { getEditPropertyPath } from '../routePaths'
import { Link } from 'react-router-dom'

export function PropertyList({ data }) {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Opportunité</Th>
          <Th>Surface</Th>
          <Th>Modifier</Th>
        </Tr>
      </thead>
      <tbody>
        {data.properties.map(({ name, surface, id }, index) => (
          <Tr key={index}>
            <Td>{name}</Td>
            <Td>{surface}</Td>
            <Td>
              <Link to={getEditPropertyPath(id)}>Edit</Link>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  )
}
