<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=false displayMessage=false; section>
    <#if section = "form">
        <#if realm.password>
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
                                        <h4 class="mb-0 fw-bold">${msg("doLogIn")}</h4>
                                        <#if realm.password && realm.registrationAllowed && !usernameEditDisabled??>
                                            <small class="pb-4 d-block"> 
                                                 <a href="${properties.urlBase}/auth/registerformik">${msg("noAccount")}</a>
                                            </small>
                                        </#if>
                                        
                                        <#if message?has_content>
                                            <div id="login-alert" class="alert alert-danger col-sm-12 mb-2">
                                                <span class="kc-feedback-text text-danger">${kcSanitize(message.summary)?no_esc}</span>
                                            </div>
                                        </#if>
                                        <form id="kc-form-login" class="${properties.kcFormClass!}" onsubmit="login.disabled = true; return true;" action="${url.loginAction?keep_after('^[^#]*?://.*?[^/]*', 'r')}" method="post">
                                            <div class="${properties.kcInputWrapperClass!} mb-2">
                                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                                <label for="username" class="form-label">${msg("email")}</label>
                                                <#if usernameEditDisabled??>
                                                    <input tabindex="1" id="username" class="${properties.kcInputClass!} form-control" name="username" value="${(login.username!'')}" type="text" disabled placeholder="<#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if>"/>
                                                <#else>
                                                    <input tabindex="1" id="username" class="${properties.kcInputClass!} form-control" name="username" value="${(login.username!'')}" type="text" autofocus autocomplete="off" placeholder="<#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if>" />
                                                </#if>
                                            </div>
                                            <div class="${properties.kcInputWrapperClass!} mb-3">
                                                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                                <label for="password" class="form-label">${msg("password")}</label>
                                                <input tabindex="2" id="password" class="${properties.kcInputClass!} form-control" name="password" type="password" autocomplete="off" placeholder="${msg("password")}"/>
                                            </div>
                                            <small id="kc-form-options" class="${properties.kcFormOptionsClass!} d-flex">
                                                <#if realm.rememberMe && !usernameEditDisabled??>
                                                    <div class="checkbox">
                                                        <label class="form-check-label form-label">
                                                            <#if login.rememberMe??>
                                                                <input tabindex="3" class="form-check-input" id="rememberMe" name="rememberMe" type="checkbox" checked> ${msg("rememberMe")}
                                                            <#else>
                                                                <input tabindex="3" class="form-check-input" id="rememberMe" name="rememberMe" type="checkbox"> ${msg("rememberMe")}
                                                            </#if>
                                                        </label>
                                                    </div>
                                                </#if>
                                                <#if realm.resetPasswordAllowed>
                                                    <div style="margin-left:auto;font-size:0.875em;"><a href="${url.loginResetCredentialsUrl}" class="text-decoration-none">${msg("doForgotPassword")}</a></div>
                                                </#if>
                                            </small>
                                            <div id="kc-form-buttons" style="margin-top:10px" class="${properties.kcFormButtonsClass!}">
                                                <div class="${properties.kcFormButtonsWrapperClass!}">
                                                    <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                                                    <input tabindex="4" class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!} me-2 btn btn-primary" name="login" id="kc-login" type="submit" value="${msg("doLogIn")}"/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </#if>
    </#if>
</@layout.registrationLayout>