import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';


import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { updateCollections } from '../../redux/shop/shop.actions';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

const ShopPage = ({ match }) => { 

    const fectchCollection = () => {
        const collectionRef = firestore.collection('collections')
        collectionRef.onSnapshot(async snapshot => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionMap);
        })
    }

    useEffect(() => {
        fectchCollection()
    }, [fectchCollection]) 

        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        );
    }    

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionMap =>
    dispatch(
        updateCollections(collectionMap))
})

export default connect(null, mapDispatchToProps) (ShopPage);

