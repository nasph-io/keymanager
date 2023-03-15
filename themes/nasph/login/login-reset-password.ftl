<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=false displayMessage=!messagesPerField.existsError('username'); section>
    <#if section = "header">
    <#elseif section = "form">
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
                                        <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!} me-2 btn btn-success" type="submit" value="${msg("doSubmit")}"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </#if>
</@layout.registrationLayout>