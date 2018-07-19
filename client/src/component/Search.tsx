import { Button, TextField } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import * as React from 'react';

const styles = ({ spacing }: Theme) => createStyles({
    textField: {
        marginLeft: spacing.unit,
        marginRight: spacing.unit,
        width: 200,
    },
});

interface OwnProps extends WithStyles<typeof styles> {
    searchText: string;
    onClick: (searchText: string) => {};
}

type ComponentProps = OwnProps;

interface OwnState {
    searchText: string;
}

class Search extends React.Component<ComponentProps, OwnState> {
    constructor(props: ComponentProps) {
        super(props);

        this.state = {
            searchText: '',
        }
    }

    public render() {
        const { classes } = this.props;
        return (
            <div>
                <TextField
                    id="search"
                    label="Search for Tweets"
                    className={classes.textField}
                    value={this.state.searchText}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <Button onClick={this.handleClick}> Search </Button>
            </div>
        );
    }

    private handleChange = (event: any) => {
        this.setState({
            searchText: event.target.value,
        });
    }

    private handleClick = (event: any) => {
        event.preventDefault();
        this.props.onClick(this.state.searchText);
    }
}

export default withStyles(styles)(Search);