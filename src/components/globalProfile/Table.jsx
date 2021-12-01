import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
const TableComponents = ({ trColor, products }) => {
  const staticImageUrl =
    'https://www.slashgear.com/wp-content/uploads/2018/02/microsoft-surface-laptop-review-0-980x620.jpg"';
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
        {products.length === 0 ? (
          <h2 className="text-dark text-center my-5 border-0">
            no items added yet
          </h2>
        ) : (
          products.map((item, index) => {
            return (
              <tbody className="table__body" key={index}>
                <tr className="table__body__tr">
                  <td>{index + 1}</td>

                  <td>
                    <Link className="noneHover" to={`/market/buy/${item.id}`}>
                      <img
                        src={staticImageUrl}
                        className="table__body__img"
                        alt=""
                      />
                    </Link>
                  </td>

                  <td>{item.deviceDetail.deviceName}</td>
                  <td>{item.deviceDetail.devicePrice} EGP</td>
                </tr>
              </tbody>
            );
          })
        )}
      </Table>
    </div>
  );
};

export default TableComponents;