My 49th assignment! This is modeled after tumblr and uses react query and contextAPI to simulate the various post-related functions such as fetching, creating, editing and deleting posts. The only caveat is that it uses the jsonplaceholder api which checks and simulates the correct endpoints, but will not actually commit changes to the server. Thus, if you create, delete or update a post it will NOT be reflected in the posts that are fetched, but it will still provide a notification at the top of the page to show success.  

In this application you are able to manually create, edit or delete posts as stated before. While on the dashboard (which is the only available page right now) you can click to edit or delete individual posts or click the create post button at the top of the page to make a new one. Clicking outside of the modal window that pops up will simply close the modal. The same form is used for both creating and editing posts, but when editing the form is passed default data as well. Special care was taken to construct the application using contextAPI to make the forms hover on the dashboard rather than be separate pages, mainly as a challenge.  

Running this application is easy, just install dependencies and then 'npm run dev' in the terminal. 