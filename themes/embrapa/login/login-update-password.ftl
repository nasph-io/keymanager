<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('password','password-confirm'); section>
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
                                    <h4 class="mb-0 fw-bold">${msg("updatePasswordTitle")}</h4>
                                    <p>${msg("resetPasswordMessage")}</p>
                                    <form id="kc-form-login" class="${properties.kcFormClass!}" onsubmit="login.disabled = true; return true;" action="${url.loginAction?keep_after('^[^#]*?://.*?[^/]*', 'r')}" method="post">
                                        <input type="text" id="username" name="username" value="${username}" autocomplete="username"
                                               readonly="readonly" style="display:none;"/>
                                        <input type="password" id="password" name="password" autocomplete="current-password" style="display:none;"/>

                                        <div class="${properties.kcFormGroupClass!} mb-3">
                                            <div class="${properties.kcLabelWrapperClass!}">
                                                <label for="password-new" class="${properties.kcLabelClass!}">${msg("passwordNew")}</label>
                                            </div>
                                            <div class="${properties.kcInputWrapperClass!}">
                                                <input type="password" id="password-new" name="password-new" class="${properties.kcInputClass!} form-control"
                                                       autofocus autocomplete="new-password"
                                                       aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>"
                                                />

                                                <#if messagesPerField.existsError('password')>
                                                    <span id="input-error-password" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                                        ${kcSanitize(messagesPerField.get('password'))?no_esc}
                                                    </span>
                                                </#if>
                                            </div>
                                        </div>

                                        <div class="${properties.kcFormGroupClass!} mb-3">
                                            <div class="${properties.kcLabelWrapperClass!}">
                                                <label for="password-confirm" class="${properties.kcLabelClass!}">${msg("passwordConfirm")}</label>
                                            </div>
                                            <div class="${properties.kcInputWrapperClass!}">
                                                <input type="password" id="password-confirm" name="password-confirm"
                                                       class="${properties.kcInputClass!} form-control"
                                                       autocomplete="new-password"
                                                       aria-invalid="<#if messagesPerField.existsError('password-confirm')>true</#if>"
                                                />

                                                <#if messagesPerField.existsError('password-confirm')>
                                                    <span id="input-error-password-confirm" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                                        ${kcSanitize(messagesPerField.get('password-confirm'))?no_esc}
                                                    </span>
                                                </#if>

                                            </div>
                                        </div>
                                        <div id="kc-form-buttons" style="margin-top:10px" class="${properties.kcFormButtonsClass!}">
                                            <div class="${properties.kcFormButtonsWrapperClass!}">
                                                <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!} me-2 btn btn-primary" type="submit" value="${msg("doSubmit")}" />
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