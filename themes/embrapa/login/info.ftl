<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
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
                                  <#if messageHeader??>
                                  <h4 class="mb-0 fw-bold">${messageHeader}</h4>
                                  <#else>
                                  <h4 class="mb-0 fw-bold">${message.summary}</h4>
                                  </#if>
                                  <div id="kc-info-message">
                                      <p class="instruction">${message.summary}<#if requiredActions??><#list requiredActions>: <b><#items as reqActionItem>${msg("requiredAction.${reqActionItem}")}<#sep>, </#items></b></#list><#else></#if></p>
                                      <#if skipLink??>
                                      <#else>
                                          <#if pageRedirectUri?has_content>
                                              <p><a href="${pageRedirectUri}">${kcSanitize(msg("backToApplication"))?no_esc}</a></p>
                                          <#elseif actionUri?has_content>
                                              <p><a href="${actionUri}">${kcSanitize(msg("proceedWithAction"))?no_esc}</a></p>
                                          <#elseif (client.baseUrl)?has_content>
                                              <p><a href="${client.baseUrl}">${kcSanitize(msg("backToApplication"))?no_esc}</a></p>
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