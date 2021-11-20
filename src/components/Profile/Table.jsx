import {Table} from 'react-bootstrap'

const TableComponents = ({images, trColor}) => {


    return (
        <div>
              <Table className="table" bordered hover>
  <thead className="table__head">
    <tr className={trColor}>
      <th>#</th>
      <th className="table__head__fristTitle"> photo</th>
      <th className="table__head__secondTitle"> Name</th>
      <th className="table__head__thirdTitle"> Price</th>
    </tr>
  </thead>
  {images.map((item, index ) => {
    return (
  <tbody className="table__body" key={index}>
    <tr className="table__body__tr">
      <td>{index + 1}</td>
      <td ><img src={item.img} className="table__body__img" alt={item.title} /></td>
      <td>{item.title}</td>
      <td>{item.price}</td>
    </tr>
  
  </tbody>
    )
  })}

</Table>
        </div>
    )
}

export default TableComponents
