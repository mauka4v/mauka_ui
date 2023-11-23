import { Input } from '@chakra-ui/react'
import React from 'react'

function GlobalFilter(filter, setFilter) {
  return (
    <span>
      Search: {' '}
      <Input 
      value={filter || ''}
      onChange={(e)=>setFilter(e.target.value)}
      />
    </span>
  )
}

export default GlobalFilter
