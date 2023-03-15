<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=false displayMessage=false; section>
    <#if section = "form">
        <#if realm.password>
        
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
            <h4 class="text-center" style="color: #444446;"><strong> Plataforma de Gerenciamento de APIs Nasph </strong></h4>
            <p class="text-center"> Seja bem-vindo(a) a plataforma Nasph</p>
            <p class="text-center" style="color: #7c7d80;">Para o acesso a plataforma você deverá entrar com seu usuário ou registrar um novo</p>
            
            <div class="row justify-content-md-center">
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <div class="p-4 m-1">
                                <h4 class="mb-3 fw-bold">${msg("doLogIn")}</h4>
                                <#if realm.password && realm.registrationAllowed && !usernameEditDisabled??>
                                    <small class="pb-4 d-block text-right"> 
                                        ${msg("noAccount")}<a href="${properties.urlBase}/auth/registerformik">  ${msg("doRegister")}</a>
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
                                            <input tabindex="4" class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!} me-2 btn btn-success" name="login" id="kc-login" type="submit" value="${msg("doLogIn")}"/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <p class="text-right mb-3" style="font-size: 0.8rem;">powered by <a href="https://nasph.io/">Nasph</a> API Manager</p>
                </div>
                            
            </div>
        </div>
        </#if>
    </#if>
</@layout.registrationLayout>