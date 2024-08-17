export type PageControlProps = {
    isFirstPage : boolean, 
    goToNextPage : () => void, 
    isLastPage : boolean,
    goToPreviousPage: () => void,
    currentPage : number
}
export function PageControl(props : PageControlProps){
    return (<div className="page-controls">
        {props.isFirstPage ? null : <input type="button" value="<<" onClick={props.goToPreviousPage}></input>}
        <span className="page-number">{props.currentPage}</span>
        {props.isLastPage ? null : <input type="button" value=">>" onClick={props.goToNextPage}></input>}
    </div>)
}