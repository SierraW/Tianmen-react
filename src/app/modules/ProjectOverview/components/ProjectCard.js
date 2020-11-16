import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as cs from "../../../../redux/csRedux";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { em_mashaji, timestamp } from "../../../../services/firebaseInit";

const useStyles = makeStyles({
    media: {
        height: 140,
    },
});

export default function ProjectCard({ imgUri, name, type, roomId }) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [unreadCount, setUnreadCount] = useState(0);

    var enterProject = function () {
        dispatch(cs.actions.setRoom(roomId));
        history.push("/support");
    }

    var myTimestamp = timestamp();

    const lvs = useSelector((state) => state.cs.lastViewStamp);
    if (lvs[roomId]) {
        const myDate = new Date(lvs[roomId]);
        myTimestamp = timestamp(myDate);
    }

    useEffect(() => {
        em_mashaji(roomId).where("time", ">=", myTimestamp).onSnapshot(querySnapshot => {
            setUnreadCount(querySnapshot.size);
        })
    }, []);

    function getMessageNotificationCountString() {
        if (unreadCount === 0) {
            return "No new message";
        } else if (unreadCount === 1) {
            return `${unreadCount} unread message`
        } else {
            return `${unreadCount} unread messages`
        }
    }

    function getMessageNotificationCountColor() {
        if (unreadCount === 0) {
            return "text-muted";
        } else {
            return "text-danger font-weight-bold"
        }
    }

    return (
        <Card className="flex-fill">
            <CardActionArea onClick={enterProject}>
                <CardMedia
                    className={classes.media}
                    image={imgUri || /^\s*&/.test(imgUri) ? "http://tianmengroup.com/server/projectimages/0.png" : imgUri}
                    title="Project"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {type}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{ width: '100%', textAlign: 'right' }}>
                <Button size="small" color="primary" onClick={enterProject}>
                    ENTER
        </Button>
                <div className="d-flex align-items-center justify-content-center"><span className={getMessageNotificationCountColor()}>
                    {getMessageNotificationCountString()}
                </span></div>

            </CardActions>
        </Card>
    );
}

ProjectCard.propTypes = {
    imgUri: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    roomId: PropTypes.string.isRequired
}