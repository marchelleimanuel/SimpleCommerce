import PageTitle from "./PageTitle";

const PageHeading = ({children, title}) => {
    return (
        <div className="page-heading-container">
            <PageTitle title={title}/>
            <p className="page-heading-paragraph">
                {children}
            </p>
        </div>
    )
}

export default PageHeading;