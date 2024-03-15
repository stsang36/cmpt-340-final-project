import '../material-kit.css';

const NavBar = () => {
  return (
    <div class="container position-sticky z-index-sticky top-0"><div class="row"><div class="col-12">
        <nav class="navbar navbar-expand-lg  blur border-radius-xl top-0 z-index-fixed shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
            <div class="container-fluid px-0">
                <a class="navbar-brand font-weight-bolder ms-sm-3" href="#" rel="tooltip" title="Type Aid - Your Typing Assistant" data-placement="bottom" target="_blank" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="./assets/images/logo.png" width="20" height="25" style={{ marginRight: "8px" }} /> Type Aid
                </a>
                <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon mt-2">
                        <span class="navbar-toggler-bar bar1"></span>
                        <span class="navbar-toggler-bar bar2"></span>
                        <span class="navbar-toggler-bar bar3"></span>
                    </span>
                </button>
                <div class="collapse navbar-collapse pt-3 pb-2 py-lg-0 w-100" id="navigation">
                    <ul class="navbar-nav navbar-nav-hover ms-auto">      
                        <li class="nav-item ms-lg-auto">
                            <a class="nav-link nav-link-icon me-2" href="https://github.com/sfu-cmpt340/TypeAid" target="_blank">
                                <i class="fa fa-github me-1"></i>
                                <p class="d-inline text-sm z-index-1 font-weight-bold" data-bs-toggle="tooltip" data-bs-placement="bottom" title="GitHub - Group 12">Github</p>
                            </a>
                        </li>
                        <li class="nav-item my-auto ms-3 ms-lg-0">
                            <a href="#" class="btn btn-sm  bg-gradient-primary  mb-0 me-1 mt-2 mt-md-0">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div></div></div>
  );
}

export default NavBar;
