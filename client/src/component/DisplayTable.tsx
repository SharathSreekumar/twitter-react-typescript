import {
    Avatar,
    Card,
    // CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    // Collapse,
    GridList,
    GridListTile,
    // IconButton,
    Paper,
    Typography,

} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import classnames from 'classnames';
import * as React from 'react';
// import { connect, Dispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const styles = ({ palette, spacing, transitions }: Theme) => createStyles({
    actions: {
        display: 'flex',
    },
    avatar: {
        backgroundColor: red[500],
        width: 60,
        height: 60,
    },
    button: {
        backgroundColor: 'transparent',
    },
    card: {
        maxWidth: '100%',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: transitions.create('transform', {
        duration: transitions.duration.shortest,
      }),
      marginLeft: 'auto',
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    head: {
        backgroundColor: '#606060',
        color: palette.common.white,
    },
    gridList: {
        // width: 500,
        // height: 450,
    },
    gridTile: {
        width: '48%',
        minHeight: 550,
        padding: 5,
    },
    icon: {
        fontSize: 20,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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
}

interface StateProps {
    header_data?: any;
    header_fail?: any;
    resp_data?: any;
    resp_fail?: any;
}

type ComponentProps = OwnProps & DispatchProps & StateProps;

interface OwnState {
    expanded: boolean;
    searchText: string;
}

class DisplayTable extends React.Component<ComponentProps, OwnState> {
    constructor(props: ComponentProps) {
        super(props);

        this.state = {
            expanded: false,
            searchText: props.searchText,
        }
    }

    /**
     * 
     * @param prevProps 
     * @param prevState 
     * @param snapshot 
     * This function is triggered on update of any `props` or `state`.
     */
    public componentDidUpdate(prevProps: ComponentProps, prevState: OwnState, snapshot: any) {
        const { getTweets, searchText, header_data: { data } } = this.props;

        if (prevProps.searchText !== searchText) {
            getTweets({ searchText }, data);
        }
    }

    public render() {
        const { classes, resp_data: { result } } = this.props;
        
        return (
            <div className="container">
                <Paper className={classes.root}>
                    {this.cardGenerate(classes, result)}
                </Paper>
            </div>
        );
    }

    /**
     * This function is to handle
     */
    // private handleExpandClick = () => {
    //     this.setState(state => ({ expanded: !state.expanded }));
    // };

    /**
     * This function generates Table Body
     */
    private cardGenerate = (classes: any, dataArray: object[] = []) => (
        <GridList className={classes.gridList}>
        {
            Array.isArray(dataArray) ? (dataArray.map((value: any, index) => (
                <GridListTile key={index} className={classes.gridTile}>
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe" className={classes.avatar}
                                    src={`${value.user.profile_image_url}`}
                                />
                            }

                            title={`${value.user.name}`}
                            subheader={`Posted On: ${value.created_at}`}
                        />
                        <CardMedia
                            className={classes.media}
                            image={`${value.user.profile_banner_url}`}
                            title={`${value.user.screen_name}`}
                        />
                        <CardContent>
                            <Typography component="p">
                                { value.text }
                            </Typography>
                        </CardContent>
                    </Card>
                </GridListTile>
            ))) : 'Sorry! No Data found'
        }
        </GridList>
    );
}

const mapStateToProps = (state: any) => {
    return {
        header_data: state.searchReducer.headerSuccess,
        header_fail: state.searchReducer.headerFail,
        resp_data: state.searchReducer.searchSuccess.data || {},
        resp_fail: state.searchReducer.searchFail,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
    getTweets: (params: any, headers: any) => dispatch({
        params,
        type: 'FETCH_REQUESTED',
    }),

});


export default connect<{}, {}, DispatchProps>(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisplayTable));