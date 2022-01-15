import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getData, deleteData, markArrived, hideModal } from '../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faThumbtack, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import './App.scss';

import Modal from './modal';
import Form from './form';
import Ratio from './ratio';
import Availability from './availability';

const App = ({ getData, data, deleteData, markArrived, noticeModal, hideModal, selectedData }) => {

  const [modalTitle, setModalTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [checked, setChecked] = useState([]);

  const prepareModal = () => {
    setModalTitle('Table Selected');
    setShowModal(true);
  }

  const modalOnClose = () => {
    setShowModal(false);
    const output=[];
    for (let i = 0; i < data.length; i++) {
      output[i] = false;
    }
    setChecked(output);
  }

 
  useEffect(() => {
    getData();
  },[]);

  useEffect(() => {
    const output=[];
    if(data.length > 0){
      for (let i = 0; i < data.length; i++) {
        output.push(false);
      }
      console.log(output);
      setChecked(output);
    }
  },[data]);

  const renderModalContent = () => {
    return (
      <div>
          <button className="btn-arrived" onClick={() => markArrived(selectedItem)}>{<FontAwesomeIcon icon={faThumbtack} />}Mark As Arrived</button>
          <button className="btn-delete" onClick={() => deleteData(checked)}>{<FontAwesomeIcon icon={faTrashAlt} />} Delete Table</button>
      </div>
    )
  }

  const onCheckboxClick = (e, item, index) => {
    prepareModal();
    setSelectedItem(item._id);
    const output = JSON.parse(JSON.stringify(checked));
    output[index] = true;
    setChecked(output);
  }
  

  const checkAll = () => {

  }
  return (
    <div className="App">
      <h2>Charts and Table Visualization</h2>
      <div className="content">
        <div className="top">
          <Form/>
          <Ratio/>
          <Availability/>
        </div>

        <div className="table">
          <table className="table-cat">
            <thead className="header">
              <tr>
                <td>
                  <div className="td">
                    <input type="checkbox" id="name" name="cat-name" value="Name" onClick={(e) => checkAll()}/>
                    <label htmlFor="name"> Name </label>
                  </div>
                </td>
                <td>
                  <div className="td">Category</div> 
                </td>
                <td>
                  <div className="td">Availibility</div>  
                </td>
                <td>
                  <div className="td">Arrival</div>
                </td>
              </tr>          
            </thead>

            <tbody>
              {data && data.length > 0 ?
                data.map((item, index) => {
                
                  return(
                    
                    <div key={item._id} className="test">
                      <td className="test-2">    
                          <input
                            type="checkbox"
                            id="name"
                            name="cat-name"
                            checked={checked[index]}
                            onClick={(e) => onCheckboxClick(e, item, index)}
                            
                          />
                        
                          <label htmlFor="name"> {item.name} </label>
                      </td>
                      <td>
                        {item.category}
                      </td>
                      <td>
                        {item.availability}
                      </td>
                      <td>
                        {item.arrival_status}
                      </td>
                    </div>
                  );
                }) :
                <tr>
                  <td>Loading</td>
                </tr>
              }
            </tbody>      
          </table>
        </div>
      </div>


      <Modal title={modalTitle} show={showModal} onClick={modalOnClose}>
        <div>
          {renderModalContent()}
        </div> 
      </Modal>

      <Modal
        show={noticeModal.show}
        onClick={hideModal}
      >
        <div>
          {noticeModal.message}
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    noticeModal: state.noticeModal,
    selectedData: state.selectedData
  }
}

export default connect(mapStateToProps, { getData, hideModal, deleteData, markArrived })(App);
