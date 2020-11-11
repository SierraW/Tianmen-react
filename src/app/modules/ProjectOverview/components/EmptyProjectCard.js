import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    media: {
        height: 140,
    },
});

export default function EmptyProjectCard() {
    const classes = useStyles();

    return (
        <Card className="flex-fill">
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={"http://tianmengroup.com/server/projectimages/0.png"}
                    title="Project"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        You don't have any project, yet.
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Awaiting invitation...
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{ width: '100%', textAlign: 'right' }}>
                <Button size="small" color="primary" disabled>
                    No new message
        </Button>
            </CardActions>
        </Card>
    );
}