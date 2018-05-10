import axios from 'axios';

export function itemsHaveError(bool) {
    return {
        type: 'ITEMS_HAVE_ERROR',
        hasError: bool
    };
}

export function itemsAreLoading(bool) {
    return {
        type: 'ITEMS_ARE_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function itemsFetchData(urls) {
    return (dispatch) => {
        dispatch(itemsAreLoading(true));

        callEndpoints(urls)
            .then((result) => {
                dispatch(itemsAreLoading(false));

                dispatch(itemsFetchDataSuccess(result))
            })
            .catch(() => dispatch(itemsHaveError(true)));
    };
}

function callEndpoints(urls) {
    let result = []

    return new Promise((resolve, reject) =>  {
        for (const url of urls) {
            axios.get(url)
                .then((response) => {
                    if (response.status !== 200) {
                        throw Error(response.statusText);
                    }

                    result.push(response.data[0])
                })
                .catch((error) => reject('error', error))
        }

        resolve(result)
    })
}
