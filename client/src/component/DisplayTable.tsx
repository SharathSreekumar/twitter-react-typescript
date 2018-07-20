import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    IconButton,
    Paper,
    Typography,

} from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import * as React from 'react';
// import { connect, Dispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

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

        console.log('headerData', data);
        console.log('searchText', searchText);
        if (prevProps.searchText !== searchText) {
            console.log('nextProps', data);
            getTweets({ searchText }, data);
        }
    }

    public render() {
        const { classes, resp_data: { data } } = this.props;

        return (
            <div className="container">
                <Paper className={classes.root}>
                    {this.cardGenerate(data)}
                </Paper>
            </div>
        );
    }

    /**
     * This function is to handle
     */
    private handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
      };

    /**
     * This function generates Table Body
     */
    private cardGenerate = (dataArray: object[] = []) => (
        (Array.isArray(dataArray) ? (dataArray.map((value: any, index) => (
            <Card>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe"
                            src={`${value.user.profile_image_url}`}
                        >
                            R
                        </Avatar>
                    }

                    title={`${value.user.name}`}
                    subheader={`${value.created_at}`}
                />
                <CardMedia
                    image={`${value.user.profile_banner_url}`}
                    title={`${value.user.screen_name}`}
                />
                <CardContent>
                    <Typography component="p">
                        { value.text }
                    </Typography>
                </CardContent>
                <CardActions disableActionSpacing={true}>
                    <IconButton
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit={true}>
                    <CardContent>
                        <Typography paragraph={true} variant="body2">
                            Method:
              </Typography>
                        <Typography paragraph={true}>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                            minutes.
              </Typography>
                        <Typography paragraph={true}>
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                            chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                            salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                            minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
                        <Typography paragraph={true}>
                            Add rice and stir very gently to distribute. Top with artichokes and peppers, and
                            cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
                            Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into
                            the rice, and cook again without stirring, until mussels have opened and rice is
                            just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
              </Typography>
                        <Typography>
                            Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        )
        )) : ''));
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
        type: 'FETCH_REQUESTED',
    }),

});


export default connect<{}, {}, DispatchProps>(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisplayTable));