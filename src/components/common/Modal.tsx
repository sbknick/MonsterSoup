import * as React from "react";

export const Modal: React.StatelessComponent<Props> = (props) =>
{
    if (!props.show)
    {
        return null;
    }

    // The gray background
    const backdropStyle: any = { // any to hax in justifyContent as a valid css attribute
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
      padding: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };

    // const innerHeight = window.innerHeight;

    // The modal "window"
    const modalStyle = {
      backgroundColor: "#fff",
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 150,
      margin: "auto",
      padding: 30,
      top: props.position && props.position.y,
      left: props.position && props.position.x,
    };

    return (
        <div className="backdrop" style={backdropStyle}>
            <div className="modal" style={modalStyle}>
                {props.children}

                <div className="footer">
                    <button onClick={props.onClose}>
                        Closed
                    </button>
                </div>
            </div>
        </div>
    );
};

interface Props
{
    show: boolean;
    position?: Position;

    onClose: (e?: any) => void;
}

export interface Position
{
    x: number;
    y: number;
}

export default Modal;
