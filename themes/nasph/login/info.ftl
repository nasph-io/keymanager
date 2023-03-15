<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
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
    </#if>
</@layout.registrationLayout>