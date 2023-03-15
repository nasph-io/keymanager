<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
    <#if section = "form">
        <div class="container d-flex justify-content-center">
          <div id="loginBox" style="margin-top:100px;" class="mainbox col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-2">
              <div class="justify-content-center align-items-center h-100">
                 <div lg="12" class="loginContainer">
                      <div class="auth-bg-left position-absolute start-0 bottom-0">
                        <img src="${url.resourcesPath}/img/login-bgleft.svg" alt="left" />
                      </div>
                      <div class="auth-bg-right position-absolute end-0 top-0">
                        <img src="${url.resourcesPath}/img/login-bg-right.svg" alt="right" />
                      </div>
                      <img src="${url.resourcesPath}/img/logo-embrapa.svg" alt="right" />
                      <div class="card">
                          <div class="card-body p-0">
                              <div class="p-4 m-1">
                                <h1>${msg("emailVerifyTitle")}</h1>
                                <p>${msg("emailVerifyInstruction1",user.email)}</p> 
                                <p>
                                    ${msg("emailVerifyInstruction2")}
                                    <br/>
                                    <a href="${url.loginAction}">${msg("doClickHere")}</a> ${msg("emailVerifyInstruction3")}
                                </p>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
    </#if>
</@layout.registrationLayout>