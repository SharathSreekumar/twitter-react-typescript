import { 
    Paper,
    Table, 
    TableBody, 
    TableCell, 
    TableFooter,
    TableHead, 
    TablePagination, 
    TableRow 
} from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import * as React from 'react';
import { connect, Dispatch  } from 'react-redux';
import { dataContentCount } from '../utility/utility';

const styles = ({ palette, spacing }: Theme) => createStyles({
    button: {
        backgroundColor: 'transparent',
    },
    head: {
        backgroundColor: '#606060',
        color: palette.common.white,
    },
    icon: {
        fontSize: 20,
    },
    root: {
        marginTop: spacing.unit * 3,
        overflowX: 'auto',
        width: '100%',
    },
    table: {
        minWidth: 700,
    },
});

interface OwnProps extends WithStyles<typeof styles> {
    searchText?: string;
}

interface DispatchProps {
   getTweets?: (params: any, headers: any) => void;
   getTwitterHeaders?: () => void;
}

interface StateProps {
    header_data?: any;
    header_fail?: any;
    resp_data?: any;
    resp_fail?: any;
}

type ComponentProps = OwnProps & DispatchProps & StateProps;

interface OwnState {
    page: number;
    rowsPerPage: number;
    searchText: string;
}

class DisplayTable extends React.Component<ComponentProps, OwnState> {
    constructor(props: ComponentProps) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 0,
            searchText: props.searchText,
        }
    }

    public componentWillMount() {
        const { getTwitterHeaders } = this.props;
        getTwitterHeaders();
    }

    /**
     * 
     * @param prevProps 
     * @param prevState 
     * @param snapshot 
     * This function is triggered on update of any `props` or `state`.
     */
    public componentDidUpdate(prevProps: ComponentProps, prevState: OwnState, snapshot:any) {
        const { getTweets, searchText, header_data: { data } } = this.props;

        console.log('headerData', data);
        console.log('searchText', searchText);
        if(prevProps.searchText !== searchText) {
            console.log('nextProps', data);
            getTweets({ searchText }, data);
        }
    }

    public render() {
        const { classes, resp_data: { data } } = this.props;
        const { rowsPerPage, page } = this.state;
        const count = dataContentCount(data);
        const emptyRows = this.calculateEmptyRows(count, page, rowsPerPage);
        
        return (
            <div className="container">
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        { this.tableHead(classes) }
                        <TableBody>
                            {this.tableBody(data, page, rowsPerPage)}
                            {this.emptyTableRow(emptyRows, 6)}
                        </TableBody>
                        { this.pagination(page, count, rowsPerPage, 3) }
                    </Table>
                </Paper>
            </div>
        );
    }

    /**
     * This function handles Pagination's Next/Prev button page value
     */
    private handleChangePage = (event:any, page:number) => {
        this.setState({ page });
    };

    /**
     * This function handles Row per table
     */
    private handleChangeRowsPerPage = (event:any) => {
        this.setState({ rowsPerPage: event.target.value });
    };

    /**
     * This function generates Table Head
     */
    private tableHead = (classes: any) => (
        <TableHead>
            <TableRow>
                <TableCell className={classes.head}>Country Name</TableCell>
                <TableCell className={classes.head}>ISO 2 Code</TableCell>
                <TableCell className={classes.head}>ISO 3 Code</TableCell>
            </TableRow>
        </TableHead>
    )

    /**
     * This function generates Table Body
     */
    private tableBody = (dataArray:object[] = [], page:number = 0, rowsPerPage:number = 5) => (
        (Array.isArray(dataArray) ? (dataArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, index) => (
            <TableRow key={index}>
                {Object.keys(value).map((jsonKey) => <TableCell key={jsonKey}>{value[jsonKey]}</TableCell>)}
            </TableRow>
        ))) : (<TableRow key={1}>
            {Object.keys(dataArray).map((jsonKey) => <TableCell key={jsonKey}>{dataArray[jsonKey]}</TableCell>)}
        </TableRow>)
        )
    )
    
    private calculateEmptyRows = (count:number = 0, page:number = 1, rowsPerPage:number = 5) => 
        ((rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage)) || 0)

    private emptyTableRow = (emptyRows:number=0, colspan:number=6) => (
        emptyRows > 0 && (
            <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={colspan} />
            </TableRow>
        )
    )
    
    private pagination = (page:number = 0, count:number = 0, rowsPerPage:number = 5, colspan:number = 3) => (
        <TableFooter>
            <TableRow>
                <TablePagination colSpan={colspan}
                    count={count} rowsPerPage={rowsPerPage}
                    page={page} onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
            </TableRow>
        </TableFooter>
    )
}

const mapStateToProps = (state: any) => {
    return {
        header_data: state.searchReducer.headerSuccess,
        header_fail: state.searchReducer.headerFail,
        resp_data: state.searchReducer.searchSuccess,
        resp_fail: state.searchReducer.searchFail,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
    getTweets: (params: any, headers: any) => dispatch({ 
        params,
        headers,
        type: 'FETCH_REQUESTED',
    }),
    getTwitterHeaders: () => dispatch({
        type: 'FETCH_API_HEADER',
    })
});


export default connect<{}, {}, DispatchProps>(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisplayTable));