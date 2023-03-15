<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=false displayMessage=!messagesPerField.existsError('username'); section>
    <#if section = "header">
    <#elseif section = "form">
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
                                <h4 class="fw-bold">${msg("doForgotPassword")}</h4>
                                <small><p class="mb-4">${msg("emailInstruction")}</p></small>
                                <form id="kc-form-login" class="${properties.kcFormClass!}" onsubmit="login.disabled = true; return true;" action="${url.loginAction?keep_after('^[^#]*?://.*?[^/]*', 'r')}" method="post">
                                    <div class="${properties.kcInputWrapperClass!} mb-3">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                        <label for="username" class="${properties.kcLabelClass!} form-label"><#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if></label>
                                        <input type="text" id="username" name="username" class="${properties.kcInputClass!} form-control" autofocus value="${(auth.attemptedUsername!'')}" aria-invalid="<#if messagesPerField.existsError('username')>true</#if>"/>
                                        <#if messagesPerField.existsError('username')>
                                            <span id="input-error-username" class="${properties.kcInputErrorMessageClass!} text-danger" aria-live="polite">
                                                ${kcSanitize(messagesPerField.get('username'))?no_esc}
                                            </span>
                                        </#if>
                                    </div>
                                    <small id="kc-form-options" class="${properties.kcFormOptionsClass!} d-flex">
                                      <div style="margin-left:auto;font-size:0.875em;"><a href="${url.loginUrl}" class="text-decoration-none">${kcSanitize(msg("backToLogin"))?no_esc}</a></div>
                                    </small>
                                    <div id="kc-form-buttons" style="margin-top:10px" class="${properties.kcFormButtonsClass!}">
                                        <div class="${properties.kcFormButtonsWrapperClass!}">
                                            <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!} me-2 btn btn-primary" type="submit" value="${msg("doSubmit")}"/>
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
</@layout.registrationLayout>