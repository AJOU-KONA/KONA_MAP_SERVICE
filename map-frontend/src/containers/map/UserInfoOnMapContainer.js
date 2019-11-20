import React, {useEffect, useState} from "react";
import {InfoBox, InfoWindow} from '@react-google-maps/api';
import client from "../../lib/api/client";
import {setCommentList} from '../../modules/map';
import {useDispatch, useSelector} from "react-redux";
import InfoWindowList from "../../components/map/InfoWindowList";
import ClusterMarkerContainer from "./ClusterMarkerContainer";


const UserInfoOnMapContainer = ({zoom}) => {
    const [localInfo, setLocalInfo] = useState(null);
    const [visible, setVisible] = useState(null);
    const dispatch = useDispatch();
    const { commentList } = useSelector(({map, loading}) => ({
        commentList : map.commentList
    }));

    const onClick = () => {
        if(!visible) setVisible(true);
        else setVisible(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await client.get('/api/map');
                setLocalInfo(response.data);
            } catch (e) {
                console.dir(e);
            }
        };
        fetchData();

    }, []);

    useEffect(() => {
        console.dir(commentList);
    }, [commentList]);

    useEffect(() => {
        console.dir(localInfo);
        if(localInfo) dispatch(setCommentList(localInfo));
    }, [localInfo]);

    if (!localInfo) return null;

    return (
        <>
            <InfoWindowList info={localInfo} zoom={zoom}/>
        </>
    );
};

export default UserInfoOnMapContainer;
