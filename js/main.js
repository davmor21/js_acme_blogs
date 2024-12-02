//* #1
function createElemWithText (element = "p", textContent = "", className){
    let createdElement = document.createElement(element);
    createdElement.textContent = textContent;
    if(className){
        createdElement.className = className;
    }
    return createdElement;
}
//* #2
const createSelectOptions = (users) => {
    if(!users){
        return undefined;
    }

    const optionsArray = [];

    for(const user of users){
        const newOption = document.createElement("option");

        newOption.value = user.id
        newOption.textContent = user.name
        optionsArray.push(newOption);
    }
    return optionsArray;
}
//* #3
const toggleCommentSection = (postID) => {
    if(!postID){
        return undefined;
    }
    const section = document.querySelector(`section[data-post-id="${postID}"]`);
    if(section){
       section.classList.toggle("hide")
    }
    return section;
}
//* #4
const toggleCommentButton = (postID) => {
    if(!postID){
        return undefined;
    }
    const button = document.querySelector(`button[data-post-id="${postID}"]`);
    if (button){
        if(button.textContent == "Show Comments"){
            button.textContent = "Hide Comments"
        }
        else if(button.textContent == "Hide Comments"){
            button.textContent = "Show Comments"
        } 
        
    }
    return button
   
}
//* #5
const deleteChildElements = (parentElement) => {
    if(!parentElement || !(parentElement instanceof HTMLElement)){
        return undefined;
    }
    let child = parentElement.lastElementChild
    if(child){
        while(child){
            parentElement.removeChild(child)
            child = parentElement.lastElementChild
        }
    }
    
    return parentElement;
}
//* #6
const addButtonListeners = () => {
    const buttons = document.querySelectorAll("main button");
    if(buttons){
        for(let i = 0; i < buttons.length; i++){
            const postID = buttons[i].dataset.postId
            if(postID){
                buttons[i].addEventListener(
                    "click", 
                    function (event){
                        toggleComments(event, postID);
                    }, 
                    true)
            }
        }
    }
    return buttons;
}

//* #7
const removeButtonListeners = () => {
    const buttons = document.querySelectorAll("main button");
    if(buttons){
        for(let i = 0; i < buttons.length; i++){
            const postID = buttons[i].dataset.postId
            if(postID){
                buttons[i].removeEventListener(
                    "click", 
                    function (event){
                    toggleComments(event, postID);
                    }, 
                    true)
            }
        }
    }
    return buttons;
}

//* #8
const createComments = (comments) => {
    if(!comments){
        return undefined;
    }
    const fragment = document.createDocumentFragment();
    for(const comment of comments){
        const article = document.createElement("article");
        const h3 = createElemWithText('h3', comment.name);
        const p = createElemWithText('p', comment.body);
        const p2 = createElemWithText('p', `From: ${comment.email}`);
        article.append(h3,p,p2); 
        fragment.append(article)
    }
    return fragment
}

//* #9
const populateSelectMenu = (users) => {
    if(!users){
        return undefined;
    }
    const menu = document.getElementById("selectMenu")
    const options = createSelectOptions(users);
    for(const option of options){
        menu.append(option);
    }
    return menu
}

//* #10
const getUsers = async () => {
    try{
        const userData = await fetch("https://jsonplaceholder.typicode.com/users")
        if(!userData.ok) throw new Error("Status code not in 200-299 range");
        return await userData.json();
    } catch(error){
        console.error(error);
    }
}

//* #11
const getUserPosts = async (userID) => {
    if(!userID){
        return undefined;
    }
    try {
        const userPosts = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}/posts`)
        if(!userPosts.ok) throw new Error("Status code not in 200-299 range");
        return await userPosts.json();
    } catch (error) {
        console.error(error);
    }
}
//* #12
const getUser = async (userID) => {
    if(!userID){
        return undefined;
    }
    try {
        const user = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`)
        if(!user.ok) throw new Error("Status code not in 200-299 range");
        return await user.json();
    } catch (error) {
        console.error(error);
    }
}
//* #13
const getPostComments = async (postID) => {
    if(!postID){
        return undefined;
    }
    try {
        const postComments = await fetch(`https://jsonplaceholder.typicode.com/posts/${postID}/comments`)
        if(!postComments.ok) throw new Error("Status code not in 200-299 range");
        return await postComments.json();
    } catch (error) {
        console.error(error);
    }
}

//* #14
const displayComments = async (postID) => {
    if(!postID){
        return undefined;
    }
    const section = document.createElement("section");
    section.dataset.postId = postID;
    section.classList.add("comments", "hide");
    const comments = await getPostComments(postID);
    const fragment = createComments(comments);
    section.append(fragment);
    return section;
}

//* #15
const createPosts = async (posts) => {
    if(!posts){
        return undefined;
    }
    const fragment = document.createDocumentFragment();
    for(const post of posts){
        const article = document.createElement("article");
        const h2 = createElemWithText('h2', post.title);
        const p = createElemWithText('p', post.body);
        const p2 = createElemWithText('p', `Post ID: ${post.id}`);
        const author = await getUser(post.userId);
        const p3 = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
        const p4 = createElemWithText('p', author.company.catchPhrase);
        const button = createElemWithText("button", "Show Comments");
        button.dataset.postId = post.id;
        article.append(h2, p, p2, p3, p4, button);

        const section = await displayComments(post.id);

        article.append(section);
        fragment.append(article);
    }
    return fragment;
}

//* #16
const displayPosts = async (posts) => {
    const main = document.querySelector("main");
    const element = posts ? await createPosts(posts)
                          : createElemWithText('p', "Select an Employee to display their posts.");
    if(!posts){
        element.classList.add("default-text");
    }
    
    main.append(element)
    return element;
}


//* #17
const toggleComments = (event, postID) =>{
    if(!postID || !event){
        return undefined;
    }
    event.target.listener = true;
    const section = toggleCommentSection(postID);
    const button = toggleCommentButton(postID);
    if (!(section instanceof HTMLElement && section.tagName == "SECTION")) {
        console.error("Invalid section returned by toggleCommentSection");
    } 
    if (!(button instanceof HTMLElement && button.tagName === "BUTTON")) {
        console.error("Invalid button returned by toggleCommentButton");
    }
    return [section, button];
}
//* #18
const refreshPosts = async (posts) => {
    if(!posts){
        return undefined;
    }
    const remButtons = removeButtonListeners();
    const main = deleteChildElements(document.querySelector("main"));
    const fragment = await displayPosts(posts);
    const addButtons = addButtonListeners();
    return [remButtons, main, fragment, addButtons];
}

//* #19
const selectMenuChangeEventHandler = async (e) => {
    if(!e){
        return undefined;
    }
    try {
        let userId = e.target.value || 1;
        let posts = await getUserPosts(userId);
        let refreshPostsArray = await refreshPosts(posts);
        return [userId, posts, refreshPostsArray];
    } catch (error) {
        console.error("An error occurred in selectMenuChangeEventHandler: ", error);
        return null;
    }
};

//* #20
const initPage = async () => {
    const users = await getUsers();
    const select = populateSelectMenu(users);
    return [users, select];
}

//* 21 
const initApp = () => {
    initPage();
    const selectMenu = document.getElementById("selectMenu");
    selectMenu.addEventListener(change, selectMenuChangeEventHandler)
}

document.addEventListener('DOMContentLoaded', () => {
    const selectMenu = document.getElementById("selectMenu");
    
    if (selectMenu) {
        selectMenu.addEventListener('change', selectMenuChangeEventHandler);
    } else {
        console.warn("selectMenu element not found when attaching event listener");
    }
});