import MainLayout from '../layout/MainLayout';
import "../style/PageNotFound.css"


// a page designed to handle any errors a user may make when entering urls
function PageNotFound() {

  return (
      <MainLayout>
        <div class="page-not-found">
        <h1>PAGE NOT FOUND!</h1>
          <button><a href="/">Back to home</a></button>
        </div>
      </MainLayout>

  );
}

export default PageNotFound;
