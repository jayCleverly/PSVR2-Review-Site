import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MainLayout from '../layout/MainLayout';


// a page designed to handle any errors a user may make when entering urls
function PageNotFound() {

  return (
      <MainLayout>
        <div>
        <h1>PAGE NOT FOUND!</h1>
          <button><a href="/">Back to home</a></button>
        </div>
      </MainLayout>

  );
}

export default PageNotFound;
