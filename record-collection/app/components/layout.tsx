export function Layout (props: LayoutParams){

    return <div className="primary-layout">
        <Header/>
        <div className="side-bar-add-content">
            <div className="side-bar">
                {
                    props.sideBarButtons
                }
            </div>
            <div className="content">
                {
                    props.content
                }
            </div>
        </div>
    </div>
}
export type LayoutParams = {
    content: JSX.Element, 
    sideBarButtons: JSX.Element[],
}
export function Header(props: any) {
    return (
    <div className="header ">

           <h1>Jeremy's Record Collection</h1>
            <div className="hz-buttons">
                <button type="button">
                    Artists
                </button>
                <button type="button">
                    Albums
                </button>
            </div>
        </div>
    )
}