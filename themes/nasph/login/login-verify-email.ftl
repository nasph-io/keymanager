<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
    <#if section = "form">
        <div class="container-fluid">
          <div class="float-left">
              <img src="${url.resourcesPath}/img/login-bgleft.svg" alt="left" width="20%" class="fixed-bottom"/>
          </div>
          <div class="fixed-top">
              <img src="${url.resourcesPath}/img/login-bg-right.svg" alt="right" class="float-right"  />
          </div>
          <div class="row justify-content-md-center">
              <div class="text-center my-3">
                  <img src="${url.resourcesPath}/img/home-logo.svg" class="rounded img-fluid" alt="right" width="300" height="300">
              </div>
          </div>
          
          <div class="row justify-content-md-center">
              <div class="col-sm-6">
                  
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
    </#if>
</@layout.registrationLayout>