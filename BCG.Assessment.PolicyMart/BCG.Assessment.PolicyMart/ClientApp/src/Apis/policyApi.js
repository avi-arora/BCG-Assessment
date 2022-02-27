
/*
 * Using Fetch instead of axios to save dev time, less package etc
 * 
 * NOTE: Axios can be used but ignored due to demo application. 
 * */
export const getAll = () => {
    return fetch("/api/policy/all").then((resp) => resp.json());
};

export const Delete = (id) => {
    return fetch("/api/policy/delete/"+id, {
        method: "DELETE",
    }).then((resp) => resp.json())
}

export const Add = (newPolicy) => {
    return fetch("/api/policy/add", {
        method: "POST",
        body: JSON.stringify(newPolicy)
    }).then((resp) => resp.json());
}

export const Update = (updatedPolicy) => {
    return fetch("/api/policy/update", {
        method: "PUT",
        body: JSON.stringify(updatedPolicy)
    }).then((resp) => resp.json())
}

export const GetPaginated = (payload) => {

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('currentPage', payload.currentPage);
    urlParams.set('pageSize', payload.pageSize);

    return fetch("api/policy/GetPaginated?" + urlParams).then((resp) => resp.json());
}

export const Search = (query) => {
  
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('query', query);

    return fetch("api/policy/search?" + urlParams).then((resp) => resp.json());
}

export const GetMetadata = () => {
    return fetch("api/policy/metadata").then((resp) => resp.json());
}
