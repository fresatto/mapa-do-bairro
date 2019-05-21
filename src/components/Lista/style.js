import styled from 'styled-components'

export const ContainerList = styled.section`
  background-color: #202039;
  padding: 15px;
  height: 100vh;
  color: #cfcfcf;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #202039;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #414168;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  input {
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.5rem 15px;
      cursor: pointer;
      transition: 0.1s;
      margin: 0 -15px;
      &:hover {
        background: #ffffff1f;
      }

      address {
        margin: 0;
        font-style: italic;
        font-size: 14px;
        font-weight: 200;
      }
    }
  }
`
