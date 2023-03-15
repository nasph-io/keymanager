<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
    <#if section = "form">
      </div>
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
                                    <h1>${kcSanitize(msg("errorTitle"))?no_esc}</h1>
                                    <div id="kc-error-message">
                                        <p class="instruction">${kcSanitize(message.summary)?no_esc}</p>
                                        <#if skipLink??>
                                        <#else>
                                            <#if client?? && client.baseUrl?has_content>
                                                <p><a id="backToApplication" href="${client.baseUrl}">${kcSanitize(msg("backToApplication"))?no_esc}</a></p>
                                            </#if>
                                        </#if>
                                    </div>
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