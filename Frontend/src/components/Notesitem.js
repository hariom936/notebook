import React from 'react';

const Notesitem = (props) => {
    const { note } = props;

    return (
        <div className='col-md-3'>

            <div className="card my-3">
                {/* <img src="..." className="card-img-top" alt="..." /> */}
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2"></i>
                        <i className="fa-solid fa-pen-to-square mx-2"></i>
                    </div>
                    <p className="card-text">{note.description} </p>

                    {/* <a to="/" className="btn btn-primary">{note.tag};</a> */}
                </div>
            </div>
        </div>
    )
}

export default Notesitem