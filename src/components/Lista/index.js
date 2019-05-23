import React, { Component } from 'react'
import { ContainerList } from './style'

class Lista extends Component {
  render() {
    const { locationsFiltered, itemClick, handleFilter, query } = this.props

    return (
      <ContainerList>
        <input
          placeholder="Filtrar"
          type="text"
          id="input"
          className="form-control"
          value={query}
          onChange={e => {
            handleFilter(e.target.value)
          }}
        />
        <ul role="menubar">
          {locationsFiltered.map(location => (
            <li onClick={() => itemClick(location)} key={location.id} role="menuitem">
              {location.name}
              <address>
                {location.location.address
                  ? location.location.address
                  : 'Rua não disponível.'}
              </address>
            </li>
          ))}
        </ul>
      </ContainerList>
    )
  }
}

export default Lista
